# TSV Batch Export for Adobe After Effects

A simple utility script for Adobe After Effects to automate the population and export of compositions using spreadsheet data (TSV). This script is ideal for versioning projects where you need to generate multiple variations of a composition with different text, colors, or other essential properties.

## Features

- **Data-Driven Automation:** Populate Adobe After Effects compositions using Tab-Separated Values (.tsv).
- **Essential Properties Support:** Automatically maps TSV headers to Essential Properties in your composition.
- **Customizable Output:** Define filenames, target compositions, and even render presets directly from your spreadsheet.
- **Flexible Workflow:** Skip specific rows using a `render` flag.

## Prerequisites

- **Adobe After Effects:** Tested on recent versions with Essential Properties support.
- **Essential Properties:** Your target composition's first layer should have the Essential Properties you want to control.

## Installation

### 1. Download the Script
- **Via GitHub:** Click the green **Code** button at the top of this page and select **Download ZIP**. Once downloaded, extract the ZIP file to find `TSV Batch Export.jsx`.
- **Via Git:** Clone the repository using the following command:
  ```bash
  git clone https://github.com/KristianBroholm/tsv-batch-export.git
  ```

### 2. Move to After Effects (Optional but Recommended)
For easy access from within After Effects, move `TSV Batch Export.jsx` to the `Scripts` folder:
- **Windows:** `C:\Program Files\Adobe\Adobe After Effects <version>\Support Files\Scripts`
- **macOS:** `/Applications/Adobe After Effects <version>/Scripts`

## How to Use

1. **Prepare your Composition:** Ensure the first layer of your composition contains the "Essential Properties" you want to update.
2. **Prepare your TSV file:** Create a Tab-Separated Values file. The first row (header) must match the names of your Essential Properties or the special [reserved arguments](#arguments).
3. **Run the Script:**
   - In After Effects, go to `File > Scripts > Run Script File...` and select `TSV Batch Export.jsx`.
   - Select your `.tsv` file when prompted.
   - Select the output folder where the rendered files will be saved.

## TSV Structure & Arguments

The script supports special headers that control its behavior. Any header that doesn't match these reserved names will be treated as an Essential Property name.

| Argument | Type | Description |
| :--- | :--- | :--- |
| **filename** | String | The name of the exported file (without extension). Defaults to `composition_name_index`. |
| **comp** | String | (Optional) Select a specific composition by name. Defaults to the currently active composition. |
| **render** | Boolean | Set to `FALSE` to skip a specific row. Defaults to `TRUE`. |
| **preset** | String | (Optional) Specify an Output Module template (e.g., "Lossless"). Defaults to `Lossless with Alpha`. |

### Example TSV Data

```tsv
filename	comp	Title	Subtitle	Color	render
promo_01	MainComp	Summer Sale	50% Off	[1,0,0]	TRUE
promo_02	MainComp	Winter Sale	30% Off	[0,0,1]	TRUE
draft_01	MainComp	Testing		[0,1,0]	FALSE
```

## License

This project is licensed under the GNU GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## Author

**Kristian Broholm**
