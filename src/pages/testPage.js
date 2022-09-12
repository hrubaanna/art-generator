import React from "react";
import Image from 'next/image';

class TestPage extends React.Component {

    render() {
        return(
            <div>
                <div className="card">

                    {/* TODO: test removing photo as in Dalle Component, test changing signature color to inverted */}
                    
                    <Image id='0' src="/TestPhotos/DALLE_2.png" width="500em" height="500em" className="test-img" />
                    <Image id='1' src="/TestPhotos/DALLE_2.png" width="500em" height="500em" className="test-img" />
                    <Image id='2' src="/TestPhotos/DALLE_2.png" width="500em" height="500em" className="test-img" />
                    <Image id='3' src="/TestPhotos/DALLE_2.png" width="500em" height="500em" className="test-img" />
                    
                    
                </div>
                
            </div>
        )
    }
}

export default TestPage;