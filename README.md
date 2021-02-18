https://github.com/mmackenzie-syd/ts-app/blob/master/src/index.tsx

https://github.com/mmackenzie-syd/ts-app/blob/master/src/index.css

### List of Changes

I made the following changes to the code to correct it and ensure that it ran correctly (in the way that I think its meant to run).

1) Bind the callback method functions to the Stopwatch class instance so that the callbacks will work.

2) Move the key index outside of the lap functional component and into to the list of the Stopwatch class instance.

3) Remove the forceUpdate and move the laps array property to the state so that deleting a lap will trigger an update when in the stopped state.

4) Add missing styles and add basic styles to make it look prettier. Add correctly named html elements for the laps list (ul and li).

5) Remove the setinterval via its handle when the Stopwatch Class Component unmounts to prevent memory leak.
 
6) Add type definitions to the following (and others as shown in the attached code): the stopwatch class state; the lap functional component and input properties; the delete callback function (return a void); add return types to each method of the stopwatch class; add typecheck to the setInterval handle property.

7) Use object destructure on props input of Lap functional component.

### Suggestions for improvements

1) I would use React Hooks, with useState and useEffect, as this is the replacement for the Class based code. 

2) I would seperate the logic in the Stopwatch class and the html by moving the html to a functional component (without logic) and have only an interface to the template in the class component.

3) I would add unit tests to the Stopwatch class.

### Running the Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). In the project directory, you can run:

#### `npm start`

and open [http://localhost:3000](http://localhost:3000) to view it in the browser.
