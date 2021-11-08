import { Container, Typography } from "@mui/material";


export default function Help() {
  return (
    <Container maxWidth="lg" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Typography variant="h3" style={{margin: '10px'}}>           Help    </Typography>
      <br/>

      <Typography variant="body1" style={{margin: '10px'}} color="black">
      Results may vary from person to person depending on their age, health, physical activity, discipline, and many others factors.
      Check with your doctor before taking any diet and exercise program.

      The content on this page is informative and do not substitute medical instructions, diagnose or treatment.
      Check with your doctor any medical condition. Never ignore your doctor's opinion over the content of this website.

      This website does not recommend doctors, products, tests or procedures. Use the information on this website under your responsibility
      to improve your eating habits.

      </Typography>

      <Typography variant="body1" style={{margin: '10px'}}  color="black">
      This website does not have any dietitians or medical experts on staff. Our purpose is to help you make changes easier and quicker
      to your diet and your own parameters and make shopping and cooking your diet easier.
      </Typography>
    
    </Container>
  );
}
