const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const author = await prisma.user.upsert({
        where: {
            email: "author@example.com",
        },
        update: {},
        create: {
            name: "Admin Author",
            email: "author@example.com",
            passwordHash: hashedPassword,
            isAuthor: true,
        },
    });

    const posts = [
        {
            title: "Why Simplicity Wins in Software Development",
            content: `
Many developers are tempted to over-engineer solutions. While advanced architectures can be useful,
simplicity often leads to code that is easier to maintain, debug, and scale.

The best software solutions are frequently the ones that solve the problem directly without unnecessary abstraction.
      `,
            status: "PUBLISHED",
        },
        {
            title: "Getting Started with Prisma ORM",
            content: `
Prisma provides a modern developer experience for working with databases.

With type-safe queries, migrations, and an intuitive schema language,
it significantly improves productivity compared to traditional ORMs.
      `,
            status: "PUBLISHED",
        },
        {
            title: "Understanding JWT Authentication",
            content: `
JWTs allow applications to authenticate users without maintaining server-side sessions.

The server signs a token, the client stores it, and future requests include the token for verification.
      `,
            status: "PUBLISHED",
        },
        {
            title: "Building REST APIs with Express",
            content: `
Express remains one of the most popular frameworks for Node.js.

Its lightweight nature and flexible middleware system make it ideal for creating APIs quickly.
      `,
            status: "PUBLISHED",
        },
        {
            title: "How to Structure Large React Applications",
            content: `
As applications grow, folder structure becomes increasingly important.

Organizing by feature instead of file type often results in better maintainability.
      `,
            status: "PUBLISHED",
        },
        {
            title: "Monochromatic Design Systems",
            content: `
Using only black, white, and gray tones can create elegant interfaces.

Good typography and spacing become more important when color is limited.
      `,
            status: "NOT_PUBLISHED",
        },
        {
            title: "The Importance of Code Reviews",
            content: `
Code reviews help catch bugs, improve consistency, and spread knowledge across teams.

A healthy review culture improves overall software quality.
      `,
            status: "PUBLISHED",
        },
        {
            title: "Database Indexing Explained",
            content: `
Indexes help databases retrieve information faster.

However, too many indexes can negatively affect write performance.
      `,
            status: "NOT_PUBLISHED",
        },
        {
            title: "What Makes a Great Developer Portfolio",
            content: `
A strong portfolio focuses on quality over quantity.

Projects should clearly demonstrate problem solving, technical skill, and attention to detail.
      `,
            status: "PUBLISHED",
        },
        {
            title: "Scaling Node.js Applications",
            content: `
Scaling involves more than increasing server resources.

Caching, load balancing, database optimization, and efficient code all contribute to performance.
      `,
            status: "NOT_PUBLISHED",
        },
    ];

    for (const post of posts) {
        await prisma.post.create({
            data: {
                title: post.title,
                content: post.content.trim(),
                status: post.status,
                user: {
                    connect: {
                        id: author.id,
                    },
                },
            },
        });
    }

    console.log("✅ Seed completed successfully");
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });