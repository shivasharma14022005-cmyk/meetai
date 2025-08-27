"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client"; // make sure this path exists
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
   const { data: session} = authClient.useSession() 

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong"); // fixed typo
        },
        onSuccess: () => {
          window.alert("Success");
        },
      }
    );
  };
  
  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong"); // fixed typo
        },
        onSuccess: () => {
          window.alert("Success");
        },
      }
    );
  };
  if (session) {
    return(
     <div className="flex flex-col p-4 gap-y-4">
      <p>Logged in as {session.user.name}</p>
      <Button onClick={() => authClient.signOut()}>
        sign out
      </Button>
     </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10">
    <div className="p-4 flex flex-col gap-y-4">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={ onSubmit}>
       create user
      </Button>
    </div>
    <div className="p-4 flex flex-col gap-y-4">
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onLogin}>
       login
      </Button>
    </div>
    </div>
  );
};