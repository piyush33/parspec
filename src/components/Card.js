import { useState } from "react";
import "./Card.css";

const Card = ({item, search, itemsInList, focused}) =>{
    const [hovered, setHovered] = useState(false);

    return(
        <>
        <div className="card">
           <div>
                    {item.id.split(new RegExp(`(${search})`, "gi")).map((part, index) =>
                      part.toLowerCase() === search.toLowerCase() ? (
                        <span style={{ color: "blue" }} key={index}>
                          {part}
                        </span>
                      ) : (
                        part
                      )
                    )}
            </div>
            <div>
                    {item.name.split(new RegExp(`(${search})`, "gi")).map((part, index) =>
                      part.toLowerCase() === search.toLowerCase() ? (
                        <span style={{ color: "blue" }} key={index}>
                          {part}
                        </span>
                      ) : (
                        part
                      )
                    )}
            </div>
            {itemsInList && 
                <ul>
                    <li><span style={{ color: "blue" }}>{search}</span> found in items</li>
                </ul>
            } 
            <div>
                    {item.address.split(new RegExp(`(${search})`, "gi")).map((part, index) =>
                      part.toLowerCase() === search.toLowerCase() ? (
                        <span style={{ color: "blue" }} key={index}>
                          {part}
                        </span>
                      ) : (
                        part
                      )
                    )}
            </div>
        </div>
        </>
    )
}

export default Card;