Get-ChildItem -Path "." -Recurse | Where-Object { $_.FullName -notlike "*\node_modules\*" -and $_.FullName -notlike "*\.nx\*" -and $_.FullName -notlike "*\dist\*" } | ForEach-Object {
    $level = ($_.FullName.Split('\').Count - $PWD.Path.Split('\').Count)
    "  " * $level + $_.Name
}