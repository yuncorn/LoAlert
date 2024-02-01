import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://developer-lostark.game.onstove.com',
  headers: {
    accept: 'application/json',
    authorization:
      'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDA0NTE1MDgifQ.BHRnzLdJB-pMBYgyo7PLBaEWnyIYjgwR-JZ1-Xjkr5ZvlRSB4k51lgeIzpY2jRRXkMFaaPK2ZXGwtGDn9l2mpsalob-_VeGocf1js5LSvOD7Em-Za6D15pBV58I9cRpqG_2NJxP0AVf6Ex8lrmQZ_KN2fWrg1lg0xsOB2raPAMB6faXZ2tNDMgNphct9jmr0xzF-_glgbwH6TjBLYSrD7rO9lC4lJ3TBJ-xmA153Y7es-fuQuLoqoxDC0eLELHDA6j8l1GARimKkba82LWN-fGkKuA7QXRn4QyzzsleJJ5JLND258YBELMoGvRYRiyk3GvCX0Tss_l_G9uhksjVI1g',
    'Content-Type': 'application/json',
  },
});

function fetchNewsEvents() {
  return instance.get('/news/events');
}

function fetchAuctionsItems(payload) {
  return instance.post('/auctions/items', payload);
}

export { fetchNewsEvents, fetchAuctionsItems };
