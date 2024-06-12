import React, { useEffect, useMemo, useState } from "react";
import EditUserPopup from "./EditUserPopup";
import { MdDelete, MdEdit, MdFeaturedPlayList } from "react-icons/md";
import {
  Button,
  ChakraProvider,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import toast, { Toaster } from "react-hot-toast";

interface UserTableProps {
  refresh: boolean;
  searchParams: {
    username: string;
    fullname: string;
    role: string;
    project: string;
  };
}

export default function UserTable({ refresh, searchParams }: UserTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [refresh, searchParams]);

  const fetchUsers = async () => {
    try {
      let query = `http://localhost:3000/user`;
      const queryParams = new URLSearchParams();
      if (searchParams.username)
        queryParams.append("username", searchParams.username);
      if (searchParams.fullname)
        queryParams.append("fullname", searchParams.fullname);
      if (searchParams.role) queryParams.append("role", searchParams.role);
      if (searchParams.project)
        queryParams.append("project", searchParams.project);
      if (queryParams.toString()) {
        query += `?${queryParams.toString()}`;
      }
      const response = await fetch(query);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const openEditPopup = (user: User) => {
    setSelectedUser(user);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedUser(null);
  };
  const saveUser = (updatedUser: User) => {
    fetchUsers();
    closeEditPopup();
  };

  const deleteUser = async (username: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user?username=${username}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setUsers(users.filter((user) => user.username !== username));
        fetchUsers();
        toast.success("Customer deleted successfully!");
      } else {
        console.error("Error deleting user");
        toast.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "fullname",
        header: "Fullname",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "project",
        header: "Project",
      },
      {
        accessorKey: "activeYn",
        header: "Active",
        cell: ({ row }) => (
          <span>
            {row.original.activeYn ? (
              <span className="text-green-500 ">✅</span>
            ) : (
              <span className="text-red-500 ">❌</span>
            )}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Stack direction="row" spacing={4}>
            <Button onClick={() => openEditPopup(row.original)}>Edit</Button>

            <Button onClick={() => deleteUser(row.original.username)}>
              Delete
            </Button>
          </Stack>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <TableContainer>
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {isEditPopupOpen && selectedUser && (
        <EditUserPopup
          user={selectedUser}
          onClose={closeEditPopup}
          onSave={saveUser}
        />
      )}
    </>
  );
}
