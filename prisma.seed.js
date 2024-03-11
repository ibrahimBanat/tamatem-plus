const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const uploadDir = path.join(__dirname, 'public/images');

async function seedData() {
    try {
        //Generate 70 items with random data
        const items = [];
        for (let i = 0; i < 70; i++) {
            items.push({
                item_name: `Item ${i + 1}`,
                item_price: parseFloat((Math.random() * 100).toFixed(2)),
                item_description: `Description for Item ${i + 1}`
            });
        }

        //Move images to the public directory
        const dataDir = path.join(__dirname, 'data/images');
        const files = fs.readdirSync(dataDir);
        for (const file of files) {
            const extension = path.extname(file);
            const filename = Date.now() + '-' + Math.floor(Math.random() * 1000) + extension;
            const filePath = path.join(uploadDir, filename);
            const sourcePath = path.join(dataDir, file);
            fs.renameSync(sourcePath, filePath);
        }

        //Create media entries and connect them to items
        const mediaGroup = [];
        const movedFiles = fs.readdirSync(uploadDir);
        for (const file of movedFiles) {
            const extension = path.extname(file);
            const filename = file.replace(extension, '');
            const media = await prisma.media.create({
                data: {
                    type: 'image',
                    name: filename,
                    path: `public/${file}`,
                    extension
                }
            });
            mediaGroup.push(media);
        }

        // Connect items to media
        for (let i = 0; i < items.length; i++) {
            await prisma.item.create({
                data: {
                    ...items[i],
                    media: {
                        connect: {
                            id: mediaGroup[i].id
                        }
                    }
                }
            });
        }

        console.log('Seed data successfully completed.');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedData();
