import React, {useState, useContext,useEffect} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {ContextFirebase} from '../ContextFirebase'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

const AddHouse = () => {
  
    const firebase = useContext(ContextFirebase)
    const initialValues={
        location:'' ,                
        title:'',
        description: '',
        priceNigth: '',
        priceMonth:''}
   
    const [input, setInput] = useState(initialValues)
    const [imageName, setImageName] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    
    const { title, description, priceNigth, priceMonth, location} = input
    const {db, storage}= firebase


    const handleChange = e => {
        
        setInput({...input, [e.target.id]: e.target.value});
       
    }

    const handleChangeImage = async(e)=>{
      const file = e.target.files[0];
      if(file){
        setImageName(file.name)
          const storageRef= storage.ref()
          const fileRef= storageRef.child('houses/'+file.name)
          await fileRef.put(file)
           setImageUrl( await fileRef.getDownloadURL())
      }
      else{
        setImageName('No image selected')
      }
    
    }

  
    const handleSubmit = async (e)=>{            
            e.preventDefault()  
            db.collection("houses").add({...input, imageUrl})
            .then(() => {
                setInput({...initialValues});
                alert(`The ${title} has been added` )
                setImageUrl(null)
                setImageName(null)
            })    
    }
   

useEffect(() => {
    !imageName && setImageName('Add House photo')
}, [imageName])
   


   

    return (

        <div style={styles.container}>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                <input type="file" style={{display:'none'}}  id='image'onChange={(e)=>handleChangeImage(e)}/>
                
                    <label htmlFor="image">
                        <Button variant="contained"  component="span">{imageName} <AddPhotoAlternateIcon/> </Button>
                        
                    </label>
                </div>

                <div>
                    <TextField onChange={handleChange} value={location} style={{width:'100%',paddingTop:'20px'}} id='location'  label="Location of House" />
                </div>
                <div>
                    <TextField onChange={handleChange} style={{width:'100%',paddingTop:'20px'}} id='title' value={title}  label="Title of the House"  />
                </div>
                <div>
                    <TextField  onChange={handleChange}style={{width:'100%',paddingTop:'20px'}} id='description' value={description}  label="Description of the House" />
                </div>
                <div>
                    <TextField onChange={handleChange} style={{width:'100%',paddingTop:'20px'}} id='priceNigth' value={priceNigth}  label="Price /Night" />
                </div>
                <div>
                    <TextField  onChange={handleChange}style={{width:'100%',paddingTop:'20px'}} id='priceMonth' value={priceMonth}  label="Price /Month" />
                </div>
                   <div style={{textAlign:'center',padding:'30px'}}>
                   <Button type="submit"   variant="contained" color="primary">Submit</Button>
                   </div>
               
            </form>
        </div>
    )
}

export default AddHouse

const styles={
    container:{
        width: '50%',
        height:'100%',
        margin:'auto',
       
        padding: '100px 40px',
        borderRaduis: '20px',
        boxShadow: '0 15px 50px rgba(0, 0, 0, 0.1)',
       

    }
}
