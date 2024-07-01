import Image from "next/image";
import { Card, CardTitle } from "./card";
import Secao from "./secao";
import { Button } from "./button";

export default function Sidebar(){
    return(
    <div >
        <Card className="bg-pink-700 w-64 min-h-screen ">
          <CardTitle className="text-center py-5 flex justify-center h-20 items-center gap-2  border-b border-b-neutral-400 mb-2">
            <Image src="/logosemfundo.png" width={180} height={100} alt="Rewind-UI" className='rounded-sm'/>
          </CardTitle>
          <Secao />

        </Card>
    </div>
    )
}