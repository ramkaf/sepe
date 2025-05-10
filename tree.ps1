Get-ChildItem -Recurse -Force | Where-Object {
    ($_.PSIsContainer -or -not $_.PSIsContainer) -and
    $_.FullName -notmatch '\\(\.nx|\.git|node_modules)(\\|$)'
} | ForEach-Object {
    $relativePath = $_.FullName.Substring((Get-Location).Path.Length)
    $depth = ($relativePath -split '\\').Where({$_}).Count
    (' ' * ($depth * 2)) + '|-- ' + $_.Name
}
