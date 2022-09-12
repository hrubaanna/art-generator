import React from "react";

import { Prompts } from "./dataFile";

/**
 * 
 * Various prompts are available to guide the user
 * through. 
 * 
 * Each prompt appears in different stage of the process.
 * 
 */

 class Prompt extends React.Component {

    selectText = (medium, stage, language) => {
        
        //select the accompanying text for each stage
        if(medium === "") {
            return Prompts[language].medium;

        } else if(medium === "painting") {
            //depending on the stage, return the appropriate text
            return Prompts[language].painting[stage];

        } else if(medium === "sculpture") {
            //depending on the stage, return the appropriate text
            return Prompts[language].sculpture[stage];
        } else if(medium === "photography") {
            //depending on the stage, return the appropriate text
            return Prompts[language].photography[stage];
        }

    }

    render() {
        const { medium, stage, language } = this.props;

        return(
            <div>
                <p className="facts">{this.selectText(medium, stage, language)}</p>
            </div>
            
        )
    } 

}

export default Prompt;
