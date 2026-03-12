# TSV Batch Export for Adobe Creative Cloud

A utility suite for Adobe After Effects and Premiere Pro to automate the population of templates using spreadsheet data (TSV). These scripts are ideal for versioning projects where you need to generate multiple variations of a composition or MOGRT with different text, colors, or other properties.

## Features

### After Effects (`TSV Batch Export AE.jsx`)
- **Composition Versioning:** Populate compositions using Tab-Separated Values (.tsv).
- **Essential Properties Support:** Automatically maps TSV headers to Essential Properties.
- **Render Automation:** Adds each version to the Render Queue with customizable filenames and presets.
- **Flexible Workflow:** Skip specific rows using a `render` flag.

### Premiere Pro (`TSV Batch Export PrPro.jsx`)
- **MOGRT Batching:** Quickly create a sequence populated with multiple instances of the same MOGRT template.
- **Smart Text Handling:** Automatically handles JSON-based MGT text properties.
- **Silent Sequence Creation:** Creates a single sequence named after your TSV file and populates it without further user interaction.

## Prerequisites

### After Effects
- **Essential Properties:** Your target composition's first layer should have the Essential Properties you want to control.

### Premiere Pro
- **MOGRT Template:** Have a MOGRT (Motion Graphics Template) already imported into your Project panel.

## Installation

### 1. Download the Scripts
- **Via GitHub:** Click the green **Code** button at the top of this page and select **Download ZIP**.
- **Via Git:** Clone the repository:
  ```bash
  git clone https://github.com/KristianBroholm/tsv-batch-export.git
  ```

### 2. Move to Adobe Folders (Optional)
For easy access, move the `.jsx` files to the respective `Scripts` folders:
- **After Effects:**
  - **Windows:** `C:\Program Files\Adobe\Adobe After Effects <version>\Support Files\Scripts`
  - **macOS:** `/Applications/Adobe After Effects <version>/Scripts`
- **Premiere Pro:** 
  Premiere Pro does not have a native "Scripts" menu. To run `.jsx` files, you must use an external script runner extension (like **JSX Launcher**) or developer tools (like **ExtendScript Debugger** in VS Code).

## How to Use

### Using with After Effects
1. **Prepare your Composition:** Ensure the first layer of your composition contains the "Essential Properties" you want to update.
2. **Run the Script:** Go to `File > Scripts > Run Script File...` and select `TSV Batch Export AE.jsx`.
3. **Select Files:** Select your `.tsv` file and then the output folder for the rendered files.

### Using with Premiere Pro
1. **Select Template:** In the **Project Panel**, select the MOGRT template you wish to populate.
2. **Run the Script:** Run `TSV Batch Export PrPro.jsx` using your chosen script runner or debug tool.
3. **Select TSV:** Select your `.tsv` file.
4. **Result:** A new sequence will be created containing all MOGRT instances populated with the data from the TSV.

## TSV Structure & Arguments

The first row (header) must match the names of your **Essential Properties** (AE) or **MOGRT Parameters** (PrPro), or the special reserved arguments below.

| Argument | Type | Description | App Support |
| :--- | :--- | :--- | :--- |
| **filename** | String | The name of the exported file (AE) or ignored (PrPro). | AE |
| **comp** | String | (Optional) Select a specific AE composition by name. | AE |
| **render** | Boolean | Set to `FALSE` to skip a specific row. | AE & PrPro |
| **preset** | String | (Optional) AE Output Module template (e.g., "Lossless"). | AE |

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
