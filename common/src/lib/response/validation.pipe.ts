import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AppException } from '../exceptions/app-exceptions';

interface ValidationErrorResponse {
  [key: string]: string[] | ValidationErrorResponse;
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      validationError: { target: false },
    });

    if (errors.length > 0) {
      const formattedErrors = this.formatErrors(errors);
      throw AppException.badRequest('خطای اعتبارسنجی', formattedErrors);
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]): ValidationErrorResponse {
    return errors.reduce<ValidationErrorResponse>((acc, error) => {
      // نام فیلد دارای خطا
      const property = error.property;

      // خطاهای مستقیم فیلد
      if (error.constraints) {
        acc[property] = Object.values(error.constraints);
      }

      // خطاهای تودرتو (nested errors)
      if (error.children && error.children.length > 0) {
        acc[property] = this.formatErrors(error.children);
      }

      return acc;
    }, {});
  }
}
