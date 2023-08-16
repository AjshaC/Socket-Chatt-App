import "./Navbar.css"
import { Button} from 'antd';

import OpenPopUpBtn from "../OpenPopUpBtn/OpenPopUpBtn"

export default function Navbar(){
    return(
        <nav>
         <h1>LOGO</h1>
         <div className="NavBtn">
           <OpenPopUpBtn/>
           <Button>X</Button>
         </div>
     
        </nav>
       

    )
}