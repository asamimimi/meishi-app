import { Container, Center, Heading, Card, IconButton } from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';


// supabase
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


// 型定義
type Profile = {
    user_id: string,
    name: string,
    description: string,
    github_id: string,
    qiita_id: string,
    x_id: string
}
type Skills = {
    id: number,
    user_id: string,
    skill_id: number,
    skills: { id: number; name: string }
}


function Cards() {
    const [profile, setProfile] = useState<Profile[]>([])
    const [skill, setSkill] = useState<Skills[]>([])

    useEffect(() => {
        async function fetchRecords() {
            const { data, error } = await supabase.from('users').select()
            if (error) {
                console.error(error)
                return
            }
            if (data) {
                setProfile(data)
                console.log(data)
            }
        }
        fetchRecords()
    }, [])


    useEffect(() => {
        async function fetchSkills() {
            const { data, error } = await supabase.from('user_skill')
                .select(`
                id,
                user_id,
                skill_id,
                skills(
                    id,
                    name
                    )`
                )
            if (error) {
                console.error(error)
                return
            }
            if (data) {
                setSkill(data as unknown as Skills[])
                console.log(data)
            }
        }
        fetchSkills()
    }, [])



    return (
        <>
            {profile.map((user) => {
                const sanitizedHTML = DOMPurify.sanitize(user.description);
                const userSkills = skill.filter((s) => s.user_id === user.user_id);
                return (
                    <Container key={user.user_id}>
                        <Center>
                            <Card.Root width="320px" >
                                <Card.Body gap="2">
                                    <Card.Title mt="2">{user.name}</Card.Title>
                                    <Heading size="lg">自己紹介</Heading>

                                    <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

                                    <Heading size="lg">好きな技術</Heading>
                                    <Card.Description>
                                        好きなスキル {userSkills.map((s) => (s.skills as unknown as { name: string })?.name).join(', ')}
                                    </Card.Description>
                                </Card.Body>
                                <Card.Footer justifyContent="flex-end">
                                    <Link to={`https://github.com/${user.github_id}`} target="_brank">
                                        <IconButton aria-label="Search database">
                                            <FaGithub />
                                        </IconButton>
                                    </Link>
                                    <Link to={`https://qiita.com/${user.qiita_id}`} target="_brank">
                                        <IconButton aria-label="Search database">
                                            <LuNotebookText />
                                        </IconButton>
                                    </Link>
                                    <Link to={`https://x.com/${user.x_id}`} target="_brank">
                                        <IconButton>
                                            <FaXTwitter />
                                        </IconButton>
                                    </Link>
                                </Card.Footer>
                            </Card.Root>
                        </Center>
                    </Container>
                )

            })
            }

        </>
    )
}

export default Cards
