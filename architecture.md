# Architecture

- Parse the list of recipes and transform into active record models -> rake task and seed task
- Try to convert ingredients provided by the user into -> stems / lemmas -> do pattern matching against those.
- Perform full text search on ingredients list (full sentences) with ts vectors.
