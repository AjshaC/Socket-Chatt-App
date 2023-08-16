import "./Navbar.css"
import { Button} from 'antd';

import OpenPopUpBtn from "../OpenPopUpBtn/OpenPopUpBtn"

export default function Navbar(){
    return(
        <nav>
         <h1>LOGO</h1>
         <OpenPopUpBtn/>
         <Button>X</Button>
        </nav>
       

    )
}