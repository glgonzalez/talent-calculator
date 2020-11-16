import React, { ReactNode, Component } from "react";

interface TalentErrorBoudaryProps {
  children: ReactNode;
}

interface TalentErrorBoundaryState {
  hasError: boolean;
  error: string;
}

export class TalentErrorBoundary extends Component<TalentErrorBoudaryProps, TalentErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { 
      hasError: false, 
      error: '',
    }
  }

  componentDidCatch(error: Error) {
    if(error.message) {
      this.setState({
        hasError: true,
        error: error.message
      });
    }
  }

  render() {
    if(this.state.hasError) {
      return (
        <div className="error-container">
          {this.state.error ? <div className="error">{this.state.error}</div> : null}
          {this.props.children}
        </div>
      )
    }

    return this.props.children
  }
}