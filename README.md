# Sitecore Flow

## Team name

⟹ **Go Horse**

- Eduardon Tonon
- José Neto
- Rodrigo Peplau

![Go Horse](docs/images/Gohorse-300x300.png)

## Category

⟹ AI

## Description

**Module Purpose:**
This module integrates advanced AI into your Sitecore platform, helping your marketing and content teams easily maintain brand consistency. It ensures brand guidelines are respected, improving customer engagement, simplifying brand management, and delivering effective, data-driven results.

- **How it works:**
  It enables marketers to train Brand-Aware Assistants and use them to analyze if their content matches the Brand guidelines, giving a score and recommendations. It also offers a chat to freely inquiry the assistant.

## Video link

⟹ [Sitecore Flow](https://youtu.be/_t2V36GUc2I)

## Compatibility

- Sitecore XP
- Sitecore XM

## Pre-requisites and Dependencies

- [Sitecore Powershel Extensions 7.0](https://github.com/SitecorePowerShell/Console/releases/tag/7.0)
- [OpenAI API Key](CreatingAPIKeys.md)
- itextsharp.dll (included in the package)


## Installation instructions

1. Use the Sitecore Installation wizard to install the [package](#link-to-package)

### Configuration

1. Configure the API Key on "/sitecore/system/Modules/Sitecore Flow/Settings", also select the desired model.
2. Go to /sitecore/system/Modules/Sitecore Flow/Assistants
3. Right click on the item "Assistants" and create a new item "Style Guide"
4. Give a name of a brand "ex" My brand, can be your famous home beer company . or ex a good one like "Heineken"
5. On this Sitecore field , Upload the Style guide.
6. Click on the 'Heineken Item" and on the ribbon "Analyze", click -> 'Process all changes"
7. Check all the fields being filled

![configuration](docs/images/configuration.gif?raw=true "configuration")

## Usage instructions

⟹ Provide documentation about your module, how do the users use your module, where are things located, what do the icons mean, are there any secret shortcuts etc.

Include screenshots where necessary. You can add images to the `./images` folder and then link to them from your documentation:

## Comments

This module significantly streamlines brand management by integrating AI directly into the content editing workflow. It provides immediate feedback by comparing content against brand guidelines, ensuring consistent branding across all channels. Future enhancements could include expanding AI recommendations for content optimization or integrating additional file formats for style guides.

