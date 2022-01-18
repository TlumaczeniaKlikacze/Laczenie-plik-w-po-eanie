const csv = require('csvtojson');
const fs = require('fs')
let list =[]
let do_tego_dodac = []
csv({delimiter:";",noheader:false})
.fromFile("./files/dodac.csv")
.subscribe((jsonObj,index)=>{
    list.push(jsonObj)
})
.on('done',async()=>{
    csv({delimiter:";",noheader:false})
    .fromFile("./files/do_tego_dodac.csv")
    .subscribe((jsonObj,index)=>{
        do_tego_dodac.push(jsonObj)
    })
    .on('done',async()=>{
        console.log(do_tego_dodac)
        work()
    })
})

let tmp = 0
const csv_writer = require('csv-writer');
const createCsvWrite = csv_writer.createObjectCsvWriter;
const work = ()=>{
    do_tego_dodac.forEach(el=>{
       tmp = list.find(e=> e.ean == el.ean)
       console.log(tmp)
       if(tmp != undefined){
           //id kolumny
           //tutaj można łączyć wiele wartości
           el.id = tmp.id
       }
       el.ean = '"'+el.ean+'"'

    })
    const csvWriter = createCsvWrite({fieldDelimiter:';', path:`pol.csv`,header:[
        //tutaj zapisujemy wartości które chcemy w pliku csv
        {id:"cena_brutto",title:"cena_brutto"},
        {id:"id",title:"id"},
    
    ]})
    csvWriter
    .writeRecords(do_tego_dodac)
    .then(()=> console.log('done'))
    .catch((er)=>{
        console.log(er)
    })
}
