import React from 'react'
import Slider from 'react-slick/lib/slider'
import SliderCustom from '../functional/SliderCustom'
import RecipeCard from '../functional/RecipeCard'

const WeeklyHighlights = ({ photo }) => {

    var data = {
        title: "Çiğ Köfte", image: photo, categories: ["ev yemeği", "acı"]
    }
    return (
        <SliderCustom>
            <RecipeCard {...data} />
            <RecipeCard {...data} />
            <RecipeCard {...data} />
            <RecipeCard {...data} />
            <RecipeCard {...data} />
            <RecipeCard {...data} />
            <RecipeCard {...data} />
            <RecipeCard {...data} />
        </SliderCustom>
    )
}


export default WeeklyHighlights