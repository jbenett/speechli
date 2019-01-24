import React, { Component } from "react";
import DemoResultItem from "./DemoResultItem.js";

class DemoResultSidebar extends Component {
    render() {
        return (
            <div
                className={
                    this.props.displayed
                        ? "sidebar-container sidebar-displayed"
                        : "sidebar-container"
                }
            >
                <DemoResultItem
                    author="Barack Obama"
                    quote="my fellow Americans"
                    contextPrefix="Good morning to "
                    original="everyone here today"
                    image="https://pbs.twimg.com/profile_images/822547732376207360/5g0FC8XX_400x400.jpg"
                />
                <DemoResultItem
                    author="Snoop Dogg"
                    quote="all my homies"
                    contextPrefix="Good morning to "
                    original="everyone here today"
                    image="https://pbs.twimg.com/profile_images/943933166015803392/jvjasD7v_400x400.jpg"
                />
            </div>
        );
    }
}

export default DemoResultSidebar;
