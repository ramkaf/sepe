
  -- Split 'Alarm&State' into two rows
  SELECT ef_id AS efId, 'Alarm' AS browser_group
  FROM main.entity_fields
  WHERE browser_group LIKE '%Alarm%'

  UNION ALL
SELECT ef_id AS efId, 'State' AS browser_group
  FROM main.entity_fields
  WHERE browser_group LIKE '%State%'

  UNION ALL
SELECT ef_id AS efId, 'Events' AS browser_group
  FROM main.entity_fields
  WHERE browser_group LIKE '%Events%'

  UNION ALL

  SELECT ef_id AS efId, 'GeneralConfig' AS browser_group
  FROM main.entity_fields
  WHERE browser_group = 'GeneralConfig'

  UNION ALL


  SELECT ef_id AS efId, 'Parameters' AS browser_group
  FROM main.entity_fields
  WHERE browser_group = 'Parameters'
  UNION ALL
    SELECT ef_id AS efId, 'Settings' AS browser_group
  FROM main.entity_fields
  WHERE browser_group = 'Settings';



SELECT count(*) from main.entity_fields