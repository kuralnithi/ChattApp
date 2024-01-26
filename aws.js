require('dotenv').config();


//AWS
const { ListTablesCommand, DynamoDBClient, CreateTableCommand, DescribeTableCommand, DeleteTableCommand} = require("@aws-sdk/client-dynamodb");
const {marshall,unmarshall} = require('@aws-sdk/util-dynamodb');
const { DynamoDBDocumentClient, GetCommand,PutCommand, DeleteCommand, BatchGetCommand, QueryCommand, UpdateCommand} = require( "@aws-sdk/lib-dynamodb");

const AWSaccesskey=process.env.AWSaccesskey
const AWSsecretKey=process.env.AWSsecretkey
const AWSRegion=process.env.region
const chatTable=process.env.chattable

var dynamoDB= new DynamoDBClient({

region:AWSRegion,
accessKeyId:AWSaccesskey,
secretAccessKey:AWSsecretKey

})

const docClient = DynamoDBDocumentClient.from(dynamoDB);

// const createTable = async ()=>{

// const command =  new CreateTableCommand({

// TableName: "EmployeeTable",

// AttributeDefinitions:[
//     {
//         AttributeName:"emp_id",
//         AttributeType:"N"
//     },
//     {
//         AttributeName:"emp_name",
//         AttributeType:"S"
//     }
// ],
// KeySchema: [{AttributeName:"emp_id", KeyType:"HASH"},{AttributeName:"emp_name", KeyType:"RANGE"}],
// ProvisionedThroughput:{ReadCapacityUnits:1,WriteCapacityUnits:1}
// })


// const response = await dynamoDB.send(command);

// console.log(response);

// return response;



// }

// createTable();

//................................................................

// const listTable=async()=>{

//     const command = new ListTablesCommand({});
    
//     const response = await dynamoDB.send(command);
    
//     console.log(response);
    
//     return response;
//     }
    
//     listTable()

//................................................................


// const describeTable=async()=>{

// const command = new DescribeTableCommand({

// TableName:"EployeeTable"

// });

// const response = await dynamoDB.send(command);

// console.log(response.Table.ItemCount);

// return response;
// }

// describeTable()

//................................................................




// const deleteTable=async()=>{

// const command = new DeleteTableCommand({

// TableName:"EployeeTable"

// });

// const response = await dynamoDB.send(command);

// console.log(response);

// return response;
// }

// deleteTable()










// const addItem= async () =>{


// const Item ={emp_id:+"01",
//     emp_name:"pasanithi"}

// const params = {TableName:"EmployeeTable",
//                 Item: Item,
// }


//  const command =new PutCommand(params)
 
//  const response= await docClient.send(command)

// console.log(response);


// }

//     addItem()


//................................................................................................

// const deleteItem= async () =>{



// const params = {TableName:"demotable",
//                 Key: {id:"ba4d877c-d9b3-4fc6-96a3-f94991358c3a"}
// }


//  const command =new DeleteCommand(params)
 
//  const response= await docClient.send(command)

// console.log(response);


// }

//     deleteItem()

//................................................................

// const getItem= async () =>{



// const params = {TableName:"demotable",
//                 Key: {id:"001"}
// }


//  const command =new GetCommand(params)
 
//  const response= await docClient.send(command)

// console.log(response);


// }

//     getItem()

//................................................................


// const getBatchItems= async () =>{



// const params = {RequestItems:{

// demotable:{
// Keys:[{id:"001"},{id:"79bc51ce-17ff-4e4f-92e2-e8a70f31c6ee"}]

// }

// }}



//  const command =new BatchGetCommand(params)
 
//  const response= await docClient.send(command)

// console.log(response.Responses["demotable"]);


// }

//     getBatchItems()


//................................................................................................................................


// const QueryTable= async () =>{



// const params = {TableName:"EmployeeTable",
// KeyConditionExpression:"emp_id=:emp_id",
// ExpressionAttributeValues: { ":emp_id":+"1"},
// ConsistentRead: true,
// }



//  const command =new QueryCommand(params)
 
//  const response= await docClient.send(command)

// console.log(response);


// }

//     QueryTable()


//......................................................................................    


// const updateTable= async () =>{



//     const params = {TableName:"demotable",
//     Key:{id:"2"},
//     UpdateExpression: "set #n = :name",
//     ExpressionAttributeValues: { ":name":"kuralnithi"},
//     ExpressionAttributeNames: { "#n":"name"},
//     ReturnValues: "ALL_NEW",
//     }
    
    
    
//      const command =new UpdateCommand(params)
     
//      const response= await docClient.send(command)
    
//     console.log(response);
    
    
//     }
    
//     updateTable()