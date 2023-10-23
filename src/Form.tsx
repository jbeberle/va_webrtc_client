import React, {useState} from 'react'
import Chats from "./chat/Chats";


export interface FormProps {
    onSubmit: (data: FormData) => void;
    sendUserResponse: string;
    setSendUserResponse: (resp: string) => void;
}

export interface FormData {
    message: string;
}

interface ResponseBotObject {
    purpose: string;
    message: string;
    options?: string[];
    sender: string;
}


function Form({ onSubmit, sendUserResponse, setSendUserResponse }: FormProps) {
    const [userResponse, setUserResponse] = useState<string>("");
    const [step, setStep] = useState<number>(0);
    const [botResponse, setBotResponse] = useState<ResponseBotObject>({
        purpose: "",
        message: "",
        sender: "bot"
    });

    const setNextStep = (response: string) => {
        setStep(prevState => prevState + 1);
        setSendUserResponse(response);
        //let res = analyzeNextSteps(step, response);
        //setBotResponse({ ...res, sender: "bot" });
        setUserResponse("");
    };

    // event handlers

    const [formData, setFormData] = React.useState<FormData>({ message: ''});

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setUserResponse(event.target.value);
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setNextStep(userResponse);
        onSubmit(formData);
    }

    return (
        <>
        <Chats
            userResponse={userResponse}
            botResponse={botResponse}
            sendUserResponse={sendUserResponse}
        />

    <form onSubmit={handleSubmit}>
        {/*<label font-size="4px">*/}
    {/*<input type="text" name="name" value={formData.message} />*/}
            <input id="message" name="message" type="text" onChange={handleInputChange} value={formData.message}/>
{/*</label>*/}
    <button type="submit">Submit</button>
</form>
        </>
);
}

export default Form;
