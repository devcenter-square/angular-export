# angular-export
Angular directive for exporting and downloading JSON data into a CSV file

## Demo  
Demo is running in [Plunker here.](http://embed.plnkr.co/gtJeThGwByl0lv5GvF1l/).

## Usage  

Include the module in your 

```ngModule.controller(myApp, ['export.csv']) ```

Create a link in your HTML and add required attributes 

```<a export export-data="answers" export-filename="Export" export-title="" export-keys="" export-headers="">Export Data </a>```

## Attributes  

### export-data
#### *Array: Required*
This contains the array of objects you want to download as csv. It must be a array of objects. e.g

```asnwers = [{Header1: Column1_1, Header2: Column1_2, Header3: Column1_3}, {Header1:          Column2_1, Header2: Column2_2, Header3: Column2_3}]```

### export-filename
#### *String: Required*
This is the name of the file to download. If it's not provided, the file name will be in the format `Export_Current_Date`;
 
### export-title
####*String: Optional*
This is the title included inside the CSV download. An example CSV with a title is shown below
         
    CSV Title goes here
    
    Header1, Header2, Header3,
    Column1_1, Column1_2, Column1_3,
    Column2_1, Column2_2, Column2_3

### export-keys 
#### *Array: Optional*
This is an optional array of what keys you want to extract from your data. The export will only contain these keys.
```<a export export-data="answers" export-filename="Export" export-title="" export-keys="['Header1','Header3']" export-headers="">Export Data </a>```
         
    Header1, Header3,
    Column1_1, Column1_3,
    Column2_1, Column2_3
    
### export-headers
#### *Array: Optional*
By default, the CSV headers are the keys of all the objects you want to export. But you wan override them. The headers must be the same length as the data or the keys you want from the data.

```<a export export-data="answers" export-filename="Export" export-title="" export-keys="" export-headers="['Answer 1', 'Answer 2', 'Answer 3']">Export Data </a>```
         
    Answer1, Answer2, Answer3,
    Column1_1, Column1_2, Column1_3,
    Column2_1, Column2_2, Column2_3
