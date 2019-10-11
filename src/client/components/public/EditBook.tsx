import * as React from 'react';

class Template extends React.Component<TemplateProps, TemplateState> {
    constructor(props: TemplateProps) {
        super(props);
        this.state = {

        }
    }

    render () {
        return (
            <div>
                <h1>Template Page</h1>
            </div>
        );
    }
}

interface TemplateState {}
interface TemplateProps {}

export default Template;