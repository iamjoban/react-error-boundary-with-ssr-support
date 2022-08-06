# react-error-boundary-with-ssr-support

Handle SSR rendering error using error boudnary.

## Installation
```
npm i react-error-boundary-with-ssr-support
```

## Usages

### Handling client and server rendering error

```js
import ErrorBoundaryWithSSRSupport from 'react-error-boundary-with-ssr-support';


class App extends React.Component {
	reportErrorHandler(error, errorInfo) {
		/* Log error somewhere */
	}

	fallbackHandler() {
              /* Anythig you want to render as fallback content */
		return <div>Error Fallback</div>;
	}

	render() {
	  return (
		<>
		  <p>Hello world</p>
		  <ErrorBoundaryWithSSRSupport fallbackHandler={this.fallbackHandler} handleSSRErrors reportErrorHandler={reportErrorHandler}>
			  /* Any children/component */
		  </ErrorBoundaryWithSSRSupport>
		</>
	  );
	}
}

export default App;
```
**Note**: if you do not pass **handleSSRErrors** flag as true then error will not be handle on server.

