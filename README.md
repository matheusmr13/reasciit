# Reasciit
Code like React, render as ASCII.

```
                              ____                     _ _ _      _        
                             |  _ \ ___  __ _ ___  ___(_|_) |_   | |___    
                             | |_) / _ \/ _` / __|/ __| | | __|  | / __|   
                             |  _ <  __/ (_| \__ \ (__| | | || |_| \__ \   
                             |_| \_\___|\__,_|___/\___|_|_|\__\___/|___/   
                                                                           
                                     .:///:-.         `.-:///:.            
                                    :+:```.-/+:.    ./+/-.```:+-           
                                   `+/       `-//--+/-`       /+           
                                   .+:         `/++/          :+.          
                                   .+:        .//..//.        /+`          
                                    ++     ``/+/..../+:``     ++           
                                  `./+///++++///::::///++++///+/`          
                              `-:/+/:++.` -+:         `/+- `.++:/+/:.`     
                            ./+:.`   .+: :+-   `-:--`   :+: /+.   `-:+/.   
                           /+-        :+/+-   :++++++:   -+/+:       `-+:  
                          .+:          ++:   `++++++++`   :+/          :+. 
                           /+-        :+/+-   :++++++-   -+/+:       `:+:  
                            ./+:.`   .+: :+-   `----`   :+: :+-   `-:+/.   
                              `-:+/:-++.` -+:         `/+- `.++:/+/:.`     
                                  `./+///++++//:::::///++++///+/.`         
                                    ++     ``/+/..../+/``     /+`          
                                   .+:        .//../+-        :+.          
                                   .+:         `/++/`         :+.          
                                   `+/       `-/+:-+/-`       /+`          
                                    :+:```.-/+/-    ./+/-.```:+-           
                                     .:///:-.`        `.-:///:.            
```

## Example usage

```js
import Reasciit from 'reasciit';

const mountHeaderStyle = () => ({
  container: { borderTop: 1, paddingBottom: 1 },
  head: { textAlign: 'center' }
});

/** @jsx Reasciit.createElement */
export const Header = () => {
  const HeaderStyles = mountHeaderStyle();
  return (
    <div style={HeaderStyles.container}>
      <div style={HeaderStyles.head}>My awesome header</div>
    </div>
  );
};

export default columns => Reasciit.renderToString(Header(), new Reasciit(columns));
```