import "./WriteAndSendContainer.css"
import { Button , Input} from 'antd';

export default function WriteAndSendContainer(){
    return (
        <div>
            <Input type="text" placeholder="Write your message" />
            <Button type="primary" >Send</Button>
        </div>
    )
}

