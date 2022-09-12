import React from 'react';
import Link from 'next/link';
const { finalDalleAssembled } = require('../Components/assembler_Obj');
import { Facts } from '../Components/dataFile';
import Image from 'next/image';

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
        introText: ['Click anywhere to Begin', 'Klikni kamkoli a začni', 'Kliken und Anfangen'],
        projectHeading: ['Become an Artist', 'Staň se umělcem', 'Künstler werden'],
        introIndex: 0,
        INTERVAL_LENGTH: 4000,
        intro_interval: null,
    }

    componentDidMount() {
        this.displayIntro();
    }
    
    changeLanguage = (e) => {
        finalDalleAssembled.language = e.target.id;
        this.setState({language: e.target.id});
        console.log(finalDalleAssembled.language);
    }

    displayIntro = () => {
        this.state.intro_interval = setInterval(() => {
            //change index for language of intro text
            if (this.state.introIndex == 2){
                this.setState({introIndex: 0})
            }
            else {
                this.setState({introIndex: this.state.introIndex += 1})
            }
        }, this.state.INTERVAL_LENGTH);
    }

    changeScreen = () => {
        let langButtons = document.querySelectorAll('.btn-language');
        langButtons.forEach(element => {
            element.style.display = 'inline';})
        //.style.display = 'inline';
    }

    //https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/United-kingdom_flag_icon_round.svg/1200px-United-kingdom_flag_icon_round.svg.png
    //<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/United-kingdom_flag_icon_round.svg/1200px-United-kingdom_flag_icon_round.svg.png"></img>
    //DE flag: https://cdn-icons-png.flaticon.com/512/197/197571.png
    //ENG flag: https://cdn-icons-png.flaticon.com/512/197/197374.png
    //CZ flag: https://cdn-icons-png.flaticon.com/512/197/197576.png
    //<img className="DALLE_example" id={'DALLE1'} src={require("./Images/CZ_flag.png")}></img>
    /**
    * create element which will hold the Begin prompt
    */

    render() {
        return(
            <div onClick={this.changeScreen}> 
                
                <h1>{this.state.projectHeading[this.state.introIndex]}</h1>
                <p className='intro-text'>{this.state.introText[this.state.introIndex]}</p>

                <div className="div-language">
                    <Link href={'/dialoguePage'}>
                        <img className="btn-language" id={'DE'} onClick={this.changeLanguage} src="/Images/DE_flag.png"></img>
                    </Link>
                    <Link href={'/dialoguePage'}>
                        <img className="btn-language" id={'ENG'} onClick={this.changeLanguage} src="/Images/ENG_flag.png"></img>
                    </Link>
                    <Link href={'/dialoguePage'}>
                        <img className="btn-language" id={'CZ'} onClick={this.changeLanguage} src="/Images/CZ_flag.png"></img>
                    </Link>
                </div>
        

            </div>
                
        )
    } 


}

export default OpeningPage;