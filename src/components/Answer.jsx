import { useEffect,useState } from "react";

const Answer = (ans,index) => {
    //console.log(ans,key);

    const[heading,setheading] = useState(false);
    const[result,setresult] = useState(ans.ans);

    useEffect(() => {
         if(checkHeading(ans.ans)){
            setheading(true);
            setresult(replaceHeadingStarts(ans.ans));
         }
            
        }, [])

        function replaceHeadingStarts(str){
    return str.replace(/^(\*)(\*)|(\*)$/g,' ');
    
}


         function checkHeading(str){
    return /^(\*)(\*)(.*)\*$/.test(str);
} 
    return (

        
        <div> 
            {heading?<span className="pt-2 text-lg block">{result}\
             </span>:<span className="pl-5 text-sm">{result}</span> }
         </div>
    )
}

export default Answer