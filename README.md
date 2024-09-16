# tsv-batch-export
Simple utility script for Adobe After Effects to populate and export compositions with spreadsheet data.

## How does it work?
TSV Batch Export relies on [essential properties](https://helpx.adobe.com/after-effects/using/essential-properties.html) and tab-separated values. Each row of tab-separated values will be exported as a separate file using "Lossless with Alpha" -preset. All value for essential properties are updated with tab-separated values with matching header.

## How to use it?
After the script will launch it will prompt for two inputs. First prompt tells user to select .tsv-file containing the data. Second prompt tells user to select folder where all files will be exported. 

## Properties
TSV Batch Export supports three arguments (*filename*, *comp* and *render*) that must not be used as a name for any essential property. All arguments are optional.

- **comp** (string) may be used to select which composition in the project will be exported by the script. By default the script uses currently selected composition.

- **filename** (string) may be used to set the name of the exported file. Default value is **composition_1**.

- **render** (bool) may be used in more advanced workflows to select specific rows of the spreadsheet to be processed. If **render** is set to **FALSE**, the script will bypass the row. If **render** is set to **TRUE** the row will be processed as usual.

## Upcoming featuers

- Ability to select different output modules