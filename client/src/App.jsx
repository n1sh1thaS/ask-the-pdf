import './App.css'
import QAContainer from './components/QAContainer'
import FileInput from './components/FileInput'
import Grid from '@mui/material/Grid2';

function App() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid size={8}>
          <QAContainer/>
        </Grid>
        <Grid container size={2} justifyContent="center" alignItems="center" marginLeft={'9%'}>
          <FileInput/>
        </Grid>
      </Grid>
    </>
  )
}

export default App
