import { backendUrl } from "@/config"
import { _fetch } from "@/fetch"
import { cookies } from "next/headers";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from '@mui/material';
import { User } from "@/interfaces/interfaces";
import Link from "next/link";
import { parseJwt } from "@/lib/utils";
import { redirect } from "next/navigation";
const getAllUsers = async()=>{

  const cookieStore = await cookies();

    const response  = await _fetch<Partial<User>[]>({
      url : `${backendUrl}/user/all`,
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookieStore.get('token')?.value || ''}`
      }
    })

    console.log('Fetched all users:', response);

    return response.data || [];

    
}

export default async function EditTable(){
  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value;
  const decodedToken = parseJwt(token || '');
  if(!decodedToken || decodedToken.role !== 'admin') {
    redirect(`/?error=${encodeURIComponent('You must be logged in as an admin to access this page')}`);
  }
  const allUsers = await getAllUsers();
  console.log(allUsers);
  
    return (
    <main style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 600, color: '#9900ff' }}>
        All Users
      </Typography>

      <TableContainer
        component={Paper}
        elevation={4}
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
              <TableCell style={{ fontWeight: 'bold' }}>Username</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Role</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((user, index) => (
              <TableRow
              
                key={user._id}
                style={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                  transition: 'background-color 0.3s',
                }}
                hover
              >
                <TableCell style={{ padding: '12px' }}>{user.username}</TableCell>
                <TableCell style={{ padding: '12px' }}>{user.email}</TableCell>
                <TableCell style={{ padding: '12px', textTransform: 'capitalize' }}>
                  {user.role}
                </TableCell>
                <TableCell
                style={{ padding: '12px' }}
                >
                  <Link href={`/edit/${user._id}`} className="text-blue-500 hover:text-blue-700">
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}