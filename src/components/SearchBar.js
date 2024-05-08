import {useEffect, useRef, useState} from "react";
import Card from "./Card";
import "./Card.css";

const SearchBar = () =>{

    const[list, setList] = useState([]);
    const [query, setQuery] = useState("");
    const [currentList, setCurrentList]=useState([]);
    const [empty, setEmpty] = useState(false);
    const [itemsInList, setItemsInList]=useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [prevFocusedIndex, setPrevFocusedIndex] = useState(-1); 
    const containerRef = useRef(null);
    
    function fetchData (){
        fetch("https://fe-take-home-assignment.s3.us-east-2.amazonaws.com/Data.json")
        .then((res)=>res.json())
        .then((data)=> setList(data))
    }

    useEffect(()=>{
      fetchData();
    },[])


    useEffect(() => {
        console.log("focusedIndex", focusedIndex);
        
        if (containerRef.current && focusedIndex !== -1) {
          containerRef.current.children[focusedIndex].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }, [focusedIndex]);

    // useEffect(() => {
    //     console.log("focusedIndex", focusedIndex);
      
    //     if (containerRef.current && focusedIndex !== -1) {
    //       const container = containerRef.current;
    //       const child = container.children[focusedIndex];
      
    //       const containerTop = container.scrollTop;
    //       const containerBottom = containerTop + container.clientHeight;
      
    //       const childTop = child.offsetTop;
    //       const childBottom = childTop + child.clientHeight;
      

    //       const buffer = 20;
      
    //       if (childTop < containerTop || childBottom > containerBottom) {
    //         const isDownwards = focusedIndex > prevFocusedIndex;
      
    //         if (isDownwards) {
    //           container.scroll({
    //             top: childBottom - container.clientHeight + buffer,
    //             behavior: "smooth"
    //           });
    //         } else {
    //           container.scroll({
    //             top: childTop - buffer,
    //             behavior: "smooth"
    //           });
    //         }
    //       }
    //     }
    //     setPrevFocusedIndex(focusedIndex);
    //   }, [focusedIndex, prevFocusedIndex]);
        


    function onSearch(search){
       
        let searchItem = list.filter((item) => {
            if (search === "") {
              return false;
            } 
            else if (item.name.includes(search)) {
              return true;
            }
            else if (item.address.includes(search)) {
              return true;
            }
            else if (item.id.includes(search)) {
              return true;
            }
            else if (item.pincode.includes(search)) {
              return true;
            }
            else if (item.items.length !==0){
                const foundItem = item.items.find((i) => i.includes(search));
                if(foundItem){
                    setItemsInList(true);
                }
                return foundItem !== undefined;
            }
            return false;
          });
          if(searchItem.length===0){
            setEmpty(true);
          }

          setCurrentList(searchItem);
          setFocusedIndex(-1);

    }

    const handleInputChange = (event) => {
      const inputValue = event.target.value;
      setQuery(inputValue);
      // Trigger search function here
      onSearch(inputValue);

    };

    const handleKeyDown = (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setFocusedIndex((prevIndex) =>
            prevIndex < currentList.length - 1 ? prevIndex + 1 : prevIndex
          );
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        }
    };

    const getCardStyle = (index) => {
        return index === focusedIndex  ? "card focused" : "card";
    };


    return(
        <>
          <div className="inputContainer"  >
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleInputChange}
              style={{width:"25vw", padding:"15px"}}
              onKeyDown={handleKeyDown}
           />
          </div>
          <div 
             className="container"
             tabIndex={0} 
             ref={containerRef} 
             style={{height:"35vh", overflowY:"scroll"}}>
            {currentList?.map((item,index)=>{
                return(
                    <>
                      <div 
                       key={item.id}
                       className={index === focusedIndex ? "hovered" : ""}
                       onMouseEnter={() => {setFocusedIndex(index); console.log("Mouse entered:", index);}} 
                       onMouseLeave={() => setFocusedIndex(-1)} >
                        <Card item={item} search={query} itemsInList={itemsInList}/>
                      </div>
                    </>
                )
            })}
            {empty && query.length !==0 &&
            <div style={{border:"1px solid grey", width:"25vw"}}>
              <div style={{margin:"20px"}}> No User Found </div>
            </div>
            } 
          </div>
          </div>
          
        </>
    )
}

export default SearchBar;