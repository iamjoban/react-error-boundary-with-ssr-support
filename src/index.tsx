import { Component, ErrorInfo } from "react";
const renderToString  =  require('react-dom/server').renderToString;

interface Props {
  children: JSX.Element;
  handleSSRErrors: boolean;
  fallbackHandler: () => JSX.Element | null;
  reportErrorHandler: (error: Error, errorInfo?: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
}

type RType = JSX.Element | null;

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  static defaultProps = {
    handleSSRErrors: false,
    fallbackHandler: () => null,
    reportErrorHandler: () => undefined
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { reportErrorHandler} = this.props;
    
    reportErrorHandler(error, errorInfo);
    this.setState({ hasError: true });
  }

  renderOnServer(): RType {
    const { fallbackHandler, children , reportErrorHandler} = this.props;
    try {
      // Find if there is any error
      renderToString(children);

      /*
       Return children as is. Do not have to retunr output of renderToString.
       renderToString is just to find if there is any error in children we are rendering.
      */
      return children;
    } catch (e) {
      reportErrorHandler(e);
      return fallbackHandler();
    }
  }

  render(): RType {
    const { fallbackHandler, handleSSRErrors, children } = this.props;
    const { hasError } = this.state;

    if (typeof window === "undefined" && handleSSRErrors) {
      return this.renderOnServer();
    }

    if (hasError) {
      return fallbackHandler();
    }

    return children;
  }
}

export default ErrorBoundary;
