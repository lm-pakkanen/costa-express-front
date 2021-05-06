# CostaExpress website 

## Coding best practices

* Errors
    * _Caught_ errors should be named `err`, _newly created_ errors should be named `error`
        * Plurals: `errs` -> `errors`
        * _Nested_ errors may be prefixed by an underscore, up to **one** underscore.
    * Handling: 
        * Page-level boundaries handle _non-fatal_ errors related to specific pages
        * AppBoundary handles _fatal- and unknown / unexpected_ errors

* Imports
    * Import dependencies in order
        * 3rd party ( core -> others )
        * ( files in same directory)
        * `/config/*`
        * `/contexts/*`
        * `/hooks/*`
        * `/helpers/*`
        * `/controllers/*`
        * `/models/*`
        * `/pages/*`
        * `/components/boundaries/`
        * `/components/*`
        * `/interfaces/*`
