import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function Timing( detaial ) {
  
  return (
    <>
     <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={detaial.img}
        title="green iguana"
      />
      <CardContent>
      
        <Typography gutterBottom variant="h5" component="div" style={{
                color: '#000000',
                fontWeight: 'bold',
                fontSize: '35px',
                textAlign: 'start',
                marginTop: '10px'}} >
    
    { detaial.name}


          
        </Typography>
        <Typography variant="h3" color="text.secondary" fontWeight="100" >
        {detaial.data}

        </Typography>



      </CardContent>
   
    </Card>

      
    </>
  )
}
