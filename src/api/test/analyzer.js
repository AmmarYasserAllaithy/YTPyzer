import { fetchListData,fetchVideoData } from "../index.js";

let hasError = false;
let playlist = null;

const log = (o) => console.log(o);

const analyzer = (url) => {
  const playlistId = new URL(url).searchParams.get("list");
  hasError = false;
  log("Loading...");

  fetchListData(playlistId)
    .then((data) => {
      playlist = data.items[0];
      log("Fetched");
      log(playlist);
    })
    .catch((err) => {
      hasError = true;
      log('Error ×')
      log(err);
    });
};

//analyzer("https://youtube.com/playlist?list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1");

fetchVideoData(['OPf0YbXqDm0,JGwWNGJdvx8,EC9CLv6t2ms,rYEDA3JcQqw,YqeW9_5kURI,OXui9sToANY,OiC1rgCPmUQ,zABLecsR5UE,2Vv-BfVoq4g,3AtDnEC4zak,jWmpMz57f8U,MoN9ql6Yymw,fLexgOxsZu0,0KSOMA3QBU0,fiLJaPtqBxw,k2qgadSvNyU,G7KNmW9a75Y,Hfgmz9Htbgs,aJOTlE1K90k,TUVcZfQe-Kw,P6hSp7u9Jmo,09R8_2nJtjg,H5v3kku4y6Q,r_AvZtVfl5Y,euCqAq6BRa4,bESGLojNYSo,qveRjRFOGpo,bo_efYhYU2A,GxldQ9eX2wo,3L94E6_aS1A,RBumgq5yVrA,CevxZvSJLk8,x8yd0ARyQJg,Oextk-If8HQ,kTJczUoc26U,YaEG2aWJnZ8,djV11Xbc914,fRh_vgS2dFE,RlPNh_PBZb4,hLQl3WQQoQ0,Pkh8UtuejGw,bnVUHWCynig,qod03PVTLqk,nfs8NYg7yQM,ZyhrYis509A,TH_cEwXyF28,tt2k8PGm-TI,BX0lKSa_PTk,e-ORhEE9VVg,PIh2xe4jnpk,nfWlot6h_JM,Fp8msa5uYsc,qrO4YZeyl0I,LHCob76kigA,pRfmrE0ToTo,orJSJGHjBLI,nVjsGKrE6E8,LjhCEhWiKXk,5GL9JoH4Sws,6uvUTu716rU,papuvlVeZg8,31crA53Dgu0,qN4ooNx77u0,wZTIdnooV-s,hT_nvWreIhg,wXhTHyIgQ_U,50VNCymT-Cs,PEM0Vs8jf1w,QYh6mYIJG2Y,lY2yjAdbvdQ,SXiSVQZLje8,a7GITgqwDVg,SlPhMPnQ58k,ViwtNLUqkMY,-CmadmM5cOk,U3ASj1L6_sY,ZSM3w1v-A_Y,T3E9Wjbq44E,0-EF60neguk,tcYodQoapMg,VuNIsY6JdUw,IcrbM1l_BoI,dvgZkm1xWPE,oftolPu9qp4,Il-an3K9pjg,syFZfO_wfMQ,ekzHIouo8Q4,jKIEUdAMtrQ,450p7goxZqg,0yW7w8F2TVA,3AyMjyHu1bA,taSubkjZUA4,ft4jcPSLJfY,e-fA-gBCkj0,gdZLi9oWNZg,O2CIAKVTOrc,I-QfPUz1es8,5NPBIwQyPWE,HEXWRTEbj1I,Dll6VJ2C7wo,A4IeGvEEcpI,qeMFqkcPYcg,XqN2qFvY64U,RB-RcX5DS5A,XpqqjU7u5Yc,vMLk_T0PPbk,VJv2EDH6aMY,o_1aF54DO60,C-u5WLJ9Yk4,ByfFurjQDb0,NgsWGfUlwJI,k2C5TjS2sh4,wp43OdtAAkM,UqyT8IEBkvY,ZQFmRXgeR-s,ZAfAud_M_mg,uWRlisQu4fo,PaKr9gWqwl4,Uq9gPaIzbe8,0Gl2QnHNpkA,N6O2ncUKvlg,YBHQbu5rbdQ,hmUyEDG7Jy0,uSD4vsh1zDA,OpQFFLBMEPI,4NRXx6U8ABQ,WMweEpGlu_U,weRHyjj34ZE,nCkpzqqog4k,m7Bc3pLyij0,Mx_OexsUI2M,YPwtJ89jes4,t4H_Zoh7G5A,fWNaR-rxAic,2vjPBrBU-TM,4JipHEz53sU,DUT5rEU6pqM,vRXZj0DzXIA,Il0S8BoucSA,iX-QaNzd-0Y,iy4mXZN1Zzk,uuZE_IRwLNI,QrOe2h9RtWI,dT2owtxkU8k,1ekZEVeXwek,EScLmWJs82I,YQHsXMglC9A,jH1RNk8954Q,3tmd-ClpJxA,EPo5wWmKEaI,WXBHCQYxwr0,Fp_P_e1cPOE,CfihYWRWRTQ,QcIy9NiNbmo,oygrmJFKYZY,prmmCg5bKxA,BPgEgaPk62M,kTHNpusq654,qMxX-QOV9tI,av5JD1dfj_c,5vheNbQlsyU,nSDgHBxUbVQ,aatr_2MstrI,zDo0H8Fm7d0,DeumyOzKqgI,nIjVuRTm-dc,nPLV7lGbmT4,J3UjJ4wKLkg,Y0ORhLyJWuc,fk4BbF7B29w,q9miALJ2YSQ,EgT_us6AsDg,DyDfgMOUjCI,0habxsuXW4g,HBxt_v0WF6Y,EkHTsc9PU2A,jzD_yyEcp0M,QMP-o8WXSPM,Qt2mbGP6vFI,0J3vgcE5i2o,nBtDsQ4fhXY,eJnQBXmZ7Ek,fwK7ggA3-bU,Nj2U6rhnucI,VbfpW0pbvaU,pz95u3UVpaM,ZbZSe6N_BXs,E07s5ZYygMg,rtOvBOTyX00,J_ub7Etch2U,56WBK4ZK_cw,tCXGJQYZ9JA,_Z5-P9v3F8w,o3mP3mJDL2k,d020hcWA_Wg,q0hyYWKXF0Q,4m1EFMoRFvY,ZJL4UGSbeFg,CdqoNKCCt7A,gdx7gN1UyX0'])
