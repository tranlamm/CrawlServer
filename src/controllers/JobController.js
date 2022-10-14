import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.HEROKU_CRAWL_URI || process.env.CRAWL_URI;

const jobController = {
    async show(req, res) {
        const jobs = [];
        try {
            const { data } = await axios.get(uri, { params: { page: req.query.page } });
            const $ = cheerio.load(data);
            const jobItem = $('.job-item');
            jobItem.each(function () {
                const itemSkills = [];
                const link = $(this).find('.title .underline-box-job').attr('href');
                const name = $(this).find('.title .transform-job-title ').text().trim();
                const company = $(this).find('.company > a').text().trim();
                const img = $(this).find('.avatar > a > img').attr('src');
                const salary = $(this).find('.footer-end .label-footer .salary').text().trim();
                const location = $(this).find('.footer-end .label-footer .address').text().trim();
                $(this)
                    .find('.footer .skills .item')
                    .each(function () {
                        itemSkills.push($(this).text());
                    });
                jobs.push({ link, name, company, img, salary, location, itemSkills });
            });

            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async getAll(req, res) {
        const location = [];
        const job = [];

        try {
            const { data } = await axios.get('https://www.careerlink.vn/tim-viec-lam-nhanh');
            const $ = cheerio.load(data);
            const jobItem = $('.jobs-quick-category .card');
            jobItem.each(function () {
                const list = [];
                const name = $(this).find('.text-uppercase').text().trim();
                const detail = $(this).find('.list-unstyled > li');
                detail.each(function () {
                    const detailName = $(this).find('.text-body').text().trim();
                    const quantity = $(this).find('.text-secondary').text().trim();
                    list.push({ detailName, quantity });
                });
                job.push({ name, list });
            });

            const locationItem = $('.popular-locations .list-unstyled > li');
            locationItem.each(function () {
                const name = $(this).find('.text-body').text().trim();
                const quantity = $(this).find('.text-secondary').text().trim();
                location.push({ name, quantity });
            });

            res.status(200).json({ location, job });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async getSearch(req, res) {
        const jobs = [];
        try {
            const { data } = await axios.get(uri, { params: { keyword: req.query.keyword } });
            const $ = cheerio.load(data);
            const jobItem = $('.job-item');
            jobItem.each(function () {
                const itemSkills = [];
                const link = $(this).find('.title .underline-box-job').attr('href');
                const name = $(this).find('.title .transform-job-title ').text().trim();
                const company = $(this).find('.company > a').text().trim();
                const img = $(this).find('.avatar > a > img').attr('src');
                const salary = $(this).find('.footer-end .label-footer .salary').text().trim();
                const location = $(this).find('.footer-end .label-footer .address').text().trim();
                $(this)
                    .find('.footer .skills .item')
                    .each(function () {
                        itemSkills.push($(this).text());
                    });
                jobs.push({ link, name, company, img, salary, location, itemSkills });
            });

            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async getAllSkillName() {
        const urls = [];
        const names = [];
        try {
            const { data } = await axios.get('https://itviec.com/tim-viec-lam-it');
            const $ = cheerio.load(data);
            const listSkill = $('.skill-tag__list .skill-tag__item .skill-tag__link');
            listSkill.each(async function () {
                const url = `https://itviec.com${$(this).attr('href')}`;
                const name = $(this).text().trim();
                names.push(name);
                urls.push(url);
            });
            return { urls, names };
        } catch (error) {
            return {};
        }
    },

    async getAllSkill(req, res) {
        const skills = [];
        const { urls, names } = await jobController.getAllSkillName();
        try {
            for (let i = 0; i < 77; i++) {
                const { data } = await axios.get(urls[i]);
                const $ = cheerio.load(data);
                const amount = $('.search-page__jobs .search-page__jobs-inner #jobs > h1').text().trim().split(' ')[0];
                skills.push({ name: names[i], amount });
            }
            res.status(200).json(skills);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

export default jobController;
