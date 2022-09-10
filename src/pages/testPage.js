import React from "react";
import Image from 'next/image';

class TestPage extends React.Component {
    render() {
        return(
            <div>
                <div className="card" onClick={this.displayFavorite}>

                    {/* TODO: test removing photo as in Dalle Component, test changing signature color to inverted */}
                    <img
                        id={index}
                        src={result.generation.image_path} 
                        alt="" 
                        className="imgPreview"            
                    />
                </div>
                
            </div>
        )
    }
}

export default TestPage;