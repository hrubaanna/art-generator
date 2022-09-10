import React from 'react';
import Link from 'next/link';
const { finalDalleAssembled } = require('../Components/assembler_Obj');
import { Facts } from '../Components/dataFile';

/**
 * Page that lures the user in
 * 
 * Text field with name and short description of the experience
 * Some button or interaction method to allow user to begin the experience
 * 
 * TO-DO: uvodni zprava oscilovat mezi jazyky
 */

class OpeningPage extends React.Component {

    state = {
        language: finalDalleAssembled.language,
        buttons: {
            ENG: 'Begin',
            CZ: 'Začít',
            DE: 'Anfangen',
        }
    }
    
    changeLanguage = (e) => {
        finalDalleAssembled.language = e.target.value;
        this.setState({language: e.target.value});
        console.log(finalDalleAssembled.language);
    }

    render() {
        return(
            <div>

                <h1>{Facts.projectHeading[finalDalleAssembled.language]}</h1>
                <p>{Facts.introText[finalDalleAssembled.language]}</p>

                <div className="div-language">
                        <button className="btn btn-language" value={'ENG'} onClick={this.changeLanguage}> 
                            ENG
                        </button>
                        <button className="btn btn-language" value={'CZ'} onClick={this.changeLanguage}> 
                            CZ
                        </button>
                        <button className="btn btn-language" value={'DE'} onClick={this.changeLanguage}>
                            DE
                        </button>
                </div>
                
                <p>{Facts.introNudge[finalDalleAssembled.language]}</p>

                <Link href={'/dialoguePage'}>
                    <button className='btn'>
                        {this.state.buttons[finalDalleAssembled.language]}
                    </button>
                </Link>

            </div>
                
        )
    } 


}

export default OpeningPage;