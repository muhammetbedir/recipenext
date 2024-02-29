import React from 'react'
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";

const RecipeCard = ({ title, categories, image }) => {
    return (
        <Card className="pb-3 m-2">
            <CardHeader className="overflow-visible p-0">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={image}
                />
            </CardHeader>
            <CardBody className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{title}</h4>
                <div className='flex gap-1 mt-2'>
                    {categories?.map((item) => <Chip color="secondary">{item}</Chip>)}
                </div>
            </CardBody>
        </Card>
    )
}

export default RecipeCard