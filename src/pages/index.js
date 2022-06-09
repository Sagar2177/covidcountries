import Head from 'next/head'
import styles from '../styles/Home.module.css'




const Home =  (data, countries) => {
  console.log('&&&&&&',countries)
  console.log('###', data)
   return (

    <div className={styles.container}>
      
      <Head>
        <title>COVID APP</title>
        <link rel = "icon" href='/favicon.ico'></link>
      </Head>
      <div className={styles.headerInfo}>
           <p>Countries : {countries.length}</p>
      </div>
    </div>
  )
}


export async function getStaticProps(context) {
  const res = await fetch('https://api.covid19api.com/summary');
  const data = await res.json();
  const countries = await data.Countries.filter(country => country.TotalConfirmed < 5000);
  countries.sort((a,b) => (a.TotalConfirmed > b.TotalConfirmed) ? 1 : -1);
  console.log(countries.length)

  return {
    props: {data, countries}, // will be passed to the page component as props
  }
}

export default Home;


