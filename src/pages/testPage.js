import React from "react";
import Image from 'next/image';

class TestPage extends React.Component {

    printEnv = () => {
        console.log(process.env.NEXT_PUBLIC_DALLE_TOKEN)
    }

    render() {
        return(
            <div>
                <div className="card">

                    {/* TODO: test removing photo as in Dalle Component, test changing signature color to inverted */}
                    <img id='0' src="/Images/DE_flag.png" alt="" className="imgPreview" onClick={this.printEnv}/>
                </div>
                
            </div>
        )
    }
}

export default TestPage;