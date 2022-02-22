const createMovie = async (req, res) => {
    try {
        const { title, director, runtime, rating, description } = req.body;
        const newMovie = new Movie({
            title: title,
            director: director,
            runtime: runtime,
            rating, rating,
            description: description
        });
        const savedMovie = await newMovie.save();
        res
            .status(200)
        res.json({ message: "data has been saved", payload: savedMovie })
    } catch (error) {
        //Unique error
        if (error.code === 11000) {
            return res.status(500).json({
                message: "error", error: `duplicate for the title ${error.keyValue.title}`,
            });
        }



        
        return res.status(500).json({
            message: "There's an error", error: error.errors.title.message,
        });

    }



};

const number1 = async (req, res) => {
    try {
        let allTitle = await Game.find();
        res.status(200).json({ payload: allTitle });
    } catch (error) {
        res.status(500).json(error);
    }
}

const number2 = async (req, res) => {
   
    try {
        const { id } = req.params; // let id = req.params.id
        let movieDirectorByID = await Movie.movieDirectorByID(id);

        
        res.status(200).json({ payload: movieDirectorByID });
    } catch (error) {
        res.status(500).json(error);
    }
}

    const number3 = async (req, res) => {
      
        try {
            const { id } = req.params;
            let deleteOneMovie = await Movie.findByIdAndDelete(id);
            if (deleteOneMovie === null){
                throw new Error( "no game of id is found, can't delete" );
            }
            res
                .status(200)
                .json({ message: "Video game got deleted", payload: deleteOneMovie });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    const number4 = async (req, res)=>{
        try{
        const { id } = req.params;
        let updateMovie = await Movie.findByIdAndUpdate(id, req.body, {new: true});
        if(updateMovie === null) throw new Error("No Movie of id is found, can't update")
        res.status(200).json(updateMovie);
        }catch(error) {
            console.log(error);
            res.status(500).json({message: "error", error: error.message});
        }
    
      
    }
    


module.exports = {
    createMovie,
    number1, 
    number2, 
    number3,
    number4
}