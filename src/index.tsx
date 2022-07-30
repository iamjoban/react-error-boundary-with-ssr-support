import { Component, ErrorInfo } from "react";
import { renderToString } from "react-dom/server";

interface Props {
  children: JSX.Element;
  fallbackHandler: (error?: Error, errorInfo?: ErrorInfo) => JSX.Element;
  handleSSRErrors: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

type RType = JSX.Element | string;

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: undefined,
    errorInfo: undefined,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error, errorInfo });
  }

  renderServer(): RType | string {
    const { fallbackHandler } = this.props;
    try {
      const children = renderToString(this.props.children);

      return <div dangerouslySetInnerHTML={{ __html: children }} />;
    } catch (e) {
      return fallbackHandler?.(e);
    }
  }

  render(): RType {
    const { fallbackHandler, handleSSRErrors, children } = this.props;
    const { hasError, error, errorInfo } = this.state;

    if (typeof window === "undefined" && handleSSRErrors) {
      return this.renderServer();
    }

    if (hasError) {
      return fallbackHandler?.(error, errorInfo);
    }

    return children;
  }
}

export default ErrorBoundary;
