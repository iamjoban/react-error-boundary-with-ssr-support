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
	fallbackHandler(error, errorInfo) {
              /* Anythig you want to render as fallback content */
		console.log(error, errorInfo);
		return <div>Error Fallback</div>;
	}

	render() {
	  return (
		<>
		  <p>Hello world</p>
		  <ErrorBoundaryWithSSRSupport fallbackHandler={this.fallbackHandler} handleSSRErrors>
			  /* Any children/component */
		  </ErrorBoundaryWithSSRSupport>
		</>
	  );
	}
}

export default App;
```
**Note**: if you do to pass **handleSSRErrors** flag as true then error will not be handle on server.

