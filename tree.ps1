function Show-DirectoryTree {
    param (
        [Parameter(Mandatory = $false)]
        [string]$Path = ".",
        
        [Parameter(Mandatory = $false)]
        [string[]]$ExcludedDirs = @("node_modules", ".nx", "dist", ".git"),
        
        [Parameter(Mandatory = $false)]
        [switch]$ShowFiles,
        
        [Parameter(Mandatory = $false)]
        [string]$Prefix = "",
        
        [Parameter(Mandatory = $false)]
        [bool]$IsRoot = $true
    )

    # Convert relative path to absolute path if needed
    if ($IsRoot) {
        $Path = Resolve-Path $Path
    }
    
    # Get the directory name for display
    $dirName = Split-Path -Leaf $Path
    
    # For the root directory, show the full path
    if ($IsRoot) {
        Write-Host "$dirName\" -ForegroundColor Cyan
    } else {
        Write-Host "$Prefix$dirName\" -ForegroundColor Cyan
    }
    
    # Get all items in the directory
    $items = Get-ChildItem -Path $Path -Force | Where-Object {
        # Skip excluded directories
        $_.Name -notin $ExcludedDirs
    }
    
    # Sort items: directories first, then files
    $items = $items | Sort-Object @{Expression={$_.PSIsContainer -eq $false}; Ascending=$true}, @{Expression={$_.Name}; Ascending=$true}
    
    # Process each item
    for ($i = 0; $i -lt $items.Count; $i++) {
        $item = $items[$i]
        $isLast = ($i -eq ($items.Count - 1))
        
        if ($isLast) {
            $connector = "└── "
            $newPrefix = $Prefix + "    "
        } else {
            $connector = "├── "
            $newPrefix = $Prefix + "│   "
        }
        
        if ($item.PSIsContainer) {
            # Handle directories
            # Recursively process subdirectories
            Show-DirectoryTree -Path $item.FullName -ExcludedDirs $ExcludedDirs -ShowFiles:$ShowFiles -Prefix "$Prefix$connector" -IsRoot $false
        } elseif ($ShowFiles) {
            # Handle files (only if ShowFiles is enabled)
            Write-Host "$Prefix$connector$($item.Name)" -ForegroundColor White
        }
    }
}

function Display-RepoTree {
    param (
        [Parameter(Mandatory = $false)]
        [string]$Path = ".",
        
        [Parameter(Mandatory = $false)]
        [string[]]$ExcludedDirs = @("node_modules", ".nx", "dist", ".git"),
        
        [Parameter(Mandatory = $false)]
        [switch]$ShowFiles
    )
    
    Write-Host "Repository Structure:" -ForegroundColor Green
    Write-Host "=====================" -ForegroundColor Green
    
    Show-DirectoryTree -Path $Path -ExcludedDirs $ExcludedDirs -ShowFiles:$ShowFiles
}

# Parse command line arguments
param (
    [Parameter(Position = 0)]
    [string]$Path = ".",
    
    [Parameter()]
    [switch]$ShowFiles,
    
    [Parameter()]
    [string[]]$Exclude = @("node_modules", ".nx", "dist", ".git")
)

# Run the script
Display-RepoTree -Path $Path -ExcludedDirs $Exclude -ShowFiles:$ShowFiles

# Usage examples:
# 
# Basic usage (current directory):
# .\repo-tree.ps1
#
# Specify directory:
# .\repo-tree.ps1 -Path C:\Projects\MyRepo
#
# Show files:
# .\repo-tree.ps1 -ShowFiles
#
# Custom exclusions:
# .\repo-tree.ps1 -Exclude @("node_modules", ".git", "bin", "obj")