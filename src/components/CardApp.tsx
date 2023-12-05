import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";


const CardApp = ({data}:{data : any}) => {
 
  return (
    <div className=" grid grid-cols-2 sm:grid-cols-4" >
      {data?.products?.map((item : any , index :number ) => (
       
       <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
       <CardBody className="overflow-visible p-0">
         <Image
           shadow="sm"
           radius="lg"
           width="100%"
           alt={item.title}
           className="w-full object-cover h-[140px]"
           src={item.images[0]}
         />
       </CardBody>
       <CardFooter className="text-small justify-between">
         <b>{item.title}</b>
         <p className="text-default-500">{item.price}</p>
       </CardFooter>
     </Card>
      ))}
    </div>
  );
}
export default CardApp ;